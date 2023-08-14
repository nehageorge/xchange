"""Merging two heads

Revision ID: dc93ace81d26
Revises: 8dfdbaa32bf6, a3a49ed72b3a
Create Date: 2023-08-13 16:27:33.845850

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dc93ace81d26'
down_revision = ('8dfdbaa32bf6', 'a3a49ed72b3a')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
