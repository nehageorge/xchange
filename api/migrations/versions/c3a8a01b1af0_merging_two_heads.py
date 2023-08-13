"""merging two heads

Revision ID: c3a8a01b1af0
Revises: 8dfdbaa32bf6, a3a49ed72b3a
Create Date: 2023-08-13 14:10:33.962690

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c3a8a01b1af0'
down_revision = ('8dfdbaa32bf6', 'a3a49ed72b3a')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
